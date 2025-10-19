from __future__ import annotations
import numpy as np
from typing import Optional


class FuzzyCMeans:
    """Fuzzy C-Means 간단 구현 (대학 시절 Java 코드 버전)
    주요 속성:
    centers_ : (k, d) 현재 클러스터 중심
    U_       : (N, k) 현재 멤버십 행렬
    U_prev_  : (N, k) 이전 반복 멤버십 (수렴 판단용)
    m        : 퍼지 계수 (>1, 일반적으로 2)
    epsilon  : 수렴 임계값 (멤버십 변화량 기준)
    max_iter : 최대 반복 횟수
    """

    def __init__(self, m: float = 2.0, epsilon: float = 1e-2, max_iter: int = 100, seed: Optional[int] = None):
        """FCM 초기화

        m        : 퍼지 계수 (1보다 커야 함)
        epsilon  : 수렴 기준 (U 변화량 < epsilon)
        max_iter : 최대 반복 수
        seed     : 난수 시드
        """
        self.m = m if m > 1.0 else 2.0
        self.epsilon = epsilon
        self.max_iter = max_iter
        self.rng = np.random.default_rng(seed)
        self.centers_: Optional[np.ndarray] = None
        self.U_: Optional[np.ndarray] = None
        self.U_prev_: Optional[np.ndarray] = None

    def _init_membership(self, n_samples: int, n_clusters: int) -> np.ndarray:
        """초기 멤버십 행렬 무작위 생성 후 행(샘플) 단위 정규화"""
        U = self.rng.random((n_samples, n_clusters))      # 무작위 값
        U /= U.sum(axis=1, keepdims=True)                 # 각 행 합 = 1
        return U

    def _compute_centers(self, X: np.ndarray, U: np.ndarray) -> np.ndarray:
        """클러스터 중심 계산: v_k = Σ_i U_ik^m x_i / Σ_i U_ik^m"""
        um = U ** self.m                                  # 가중치 U^m
        denom = um.sum(axis=0) + 1e-12                    # 분모 (0 방지용 epsilon)
        return (um.T @ X) / denom[:, None]

    def _update_membership(self, X: np.ndarray, centers: np.ndarray) -> np.ndarray:
        """멤버십 갱신: U_ik = 1 / Σ_j ( (d_ik / d_ij)^(2/(m-1)) )"""
        # 거리 행렬 (샘플-클러스터) 계산 후 0 나눗셈 방지 상수 추가
        dist = np.linalg.norm(X[:, None, :] - centers[None, :, :], axis=2) + 1e-12
        power = 2.0 / (self.m - 1.0)
        ratio = (dist[:, :, None] / dist[:, None, :]) ** power  # (N, k, k)
        U_new = 1.0 / ratio.sum(axis=2)                        # 분모 합의 역수
        # 완전 일치(거리≈0)인 샘플은 해당 클러스터 멤버십 1로 강제
        zeros = np.isclose(dist, 1e-12)
        if zeros.any():
            i_idx, j_idx = np.where(zeros)
            for i, j in zip(i_idx, j_idx):
                U_new[i, :] = 0.0
                U_new[i, j] = 1.0
        return U_new

    # ---------------------------------- 사전 준비 완료 ----------------------------------

    # Fuzzy C-Means Main
    def fit(self, X: np.ndarray, n_clusters: int) -> "FuzzyCMeans":
        """FCM 학습 실행 (중심/멤버십 반복 갱신)"""
        X = np.asarray(X, dtype=float)
        n_samples = X.shape[0]
        self.U_ = self._init_membership(n_samples, n_clusters)
        self.U_prev_ = np.array(self.U_, copy=True)

        for _ in range(self.max_iter):
            self.centers_ = self._compute_centers(X, self.U_)      # 중심 갱신
            self.U_prev_ = np.array(self.U_, copy=True)            # 이전 U 저장
            new_U = self._update_membership(X, self.centers_)      # 멤버십 갱신
            delta = np.linalg.norm(new_U - self.U_prev_)           # 변화량 계산
            self.U_ = new_U
            if delta < self.epsilon:                               # 수렴 조건
                break
        return self

    def predict_membership(self, X_new: np.ndarray) -> np.ndarray:
        """새로운 데이터의 멤버십 행렬 반환"""
        if self.centers_ is None:
            raise RuntimeError("Not fitted")
        X_new = np.asarray(X_new, dtype=float)
        dist = np.linalg.norm(X_new[:, None, :] - self.centers_[None, :, :], axis=2) + 1e-12
        power = 2.0 / (self.m - 1.0)
        ratio = (dist[:, :, None] / dist[:, None, :]) ** power
        return 1.0 / ratio.sum(axis=2)

    def predict(self, X_new: np.ndarray) -> np.ndarray:
        """가장 높은 멤버십 클러스터 인덱스(하드 라벨) 반환"""
        return np.argmax(self.predict_membership(X_new), axis=1)

    def fit_predict(self, X: np.ndarray, n_clusters: int) -> np.ndarray:
        """fit 후 즉시 학습 데이터 라벨 반환 (편의 함수)"""
        return self.fit(X, n_clusters).predict(X)