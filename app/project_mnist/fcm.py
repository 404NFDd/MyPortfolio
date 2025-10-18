from __future__ import annotations
import numpy as np
from typing import Optional


class FuzzyCMeans:
    """Java Fuzzy.java 스타일을 단순 반영한 Fuzzy C-Means 구현

    원본 Java 구조 대비 차이:
    - static 대신 인스턴스 속성 사용 (Python 관례)
    - 데이터 검증/추가 통계 제거
    - 목적함수 기록 제거 (필요 시 다시 추가 가능)

    핵심 속성:
    - centers_ : (k, d) 클러스터 중심
    - U_       : (N, k) 현재 멤버십 행렬
    - U_prev_  : (N, k) 이전 반복 멤버십 (수렴 판단용)
    """

    def __init__(self, m: float = 2.0, epsilon: float = 1e-2, max_iter: int = 100, seed: Optional[int] = None):
        # Java 코드에 맞춰 기본 epsilon 조금 크게(예: 0.03 유사) 조정 가능
        self.m = m if m > 1.0 else 2.0
        self.epsilon = epsilon
        self.max_iter = max_iter
        self.rng = np.random.default_rng(seed)
        self.centers_: Optional[np.ndarray] = None
        self.U_: Optional[np.ndarray] = None
        self.U_prev_: Optional[np.ndarray] = None

    # Java 버전 단순화를 위해 데이터 구조 검증 로직 제거

    def _init_membership(self, n_samples: int, n_clusters: int) -> np.ndarray:
        U = self.rng.random((n_samples, n_clusters))
        U /= U.sum(axis=1, keepdims=True)
        return U

    def _compute_centers(self, X: np.ndarray, U: np.ndarray) -> np.ndarray:
        um = U ** self.m
        denom = um.sum(axis=0) + 1e-12
        return (um.T @ X) / denom[:, None]
