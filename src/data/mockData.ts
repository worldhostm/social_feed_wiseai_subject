export interface Author {
  name: string;
  username: string;
  profileImage: string;
  verified: boolean;
}

export interface Post {
  id: number;
  author: Author;
  content: string;
  images: string[];
  createdAt: string;
  likes: number;
  retweets: number;
  comments: number;
  isLiked: boolean;
  isRetweeted: boolean;
}

export interface CurrentUser {
  id: string;
  name: string;
  username: string;
  profileImage: string;
  verified: boolean;
}

export const currentUser: CurrentUser = {
  id: "user123",
  name: "내 이름",
  username: "myusername",
  profileImage: "https://picsum.photos/40/40?random=99",
  verified: false
};

export const mockPosts: Post[] = [
  {
    id: 1,
    author: {
      name: "김개발",
      username: "kimdev",
      profileImage: "https://picsum.photos/40/40?random=1",
      verified: true
    },
    content: "오늘 React 18의 새로운 기능들을 공부했습니다! Concurrent Features가 정말 흥미롭네요 🚀 #React #개발자 #프론트엔드 #웹개발",
    images: ["https://picsum.photos/500/300?random=1"],
    createdAt: "2024-01-15T10:30:00Z",
    likes: 42,
    retweets: 12,
    comments: 8,
    isLiked: false,
    isRetweeted: false
  },
  {
    id: 2,
    author: {
      name: "이디자인",
      username: "leedesign",
      profileImage: "https://picsum.photos/40/40?random=2",
      verified: false
    },
    content: "새로운 디자인 시스템을 만들고 있어요. 일관성 있는 컴포넌트 라이브러리의 중요성을 다시 한번 느낍니다 ✨ #디자인시스템 #UI #UX #디자인",
    images: [],
    createdAt: "2024-01-15T09:15:00Z",
    likes: 28,
    retweets: 5,
    comments: 3,
    isLiked: true,
    isRetweeted: false
  },
  {
    id: 3,
    author: {
      name: "박백엔드",
      username: "parkbackend",
      profileImage: "https://picsum.photos/40/40?random=3",
      verified: true
    },
    content: "Node.js 성능 최적화에 대해 블로그 포스트를 작성했습니다. 메모리 누수를 방지하는 방법들을 정리해봤어요! #NodeJS #Performance #백엔드 #서버개발",
    images: ["https://picsum.photos/500/300?random=3"],
    createdAt: "2024-01-15T08:45:00Z",
    likes: 67,
    retweets: 23,
    comments: 12,
    isLiked: false,
    isRetweeted: true
  },
  {
    id: 4,
    author: {
      name: "최모바일",
      username: "choimobile",
      profileImage: "https://picsum.photos/40/40?random=4",
      verified: false
    },
    content: "Flutter 3.0 업데이트 후 앱 성능이 정말 많이 향상됐네요. 특히 렌더링 속도가 체감될 정도로 빨라졌습니다! #Flutter #모바일개발 #앱개발 #다트",
    images: [],
    createdAt: "2024-01-15T07:20:00Z",
    likes: 34,
    retweets: 8,
    comments: 5,
    isLiked: true,
    isRetweeted: false
  },
  {
    id: 5,
    author: {
      name: "정데이터",
      username: "jungdata",
      profileImage: "https://picsum.photos/40/40?random=5",
      verified: true
    },
    content: "파이썬으로 데이터 시각화를 할 때 matplotlib vs seaborn vs plotly 중 어떤 걸 선택하시나요? 각각의 장단점을 정리해봤어요 📊 #DataViz #Python #데이터분석 #시각화",
    images: ["https://picsum.photos/500/300?random=5"],
    createdAt: "2024-01-14T23:10:00Z",
    likes: 89,
    retweets: 31,
    comments: 18,
    isLiked: false,
    isRetweeted: false
  },
  {
    id: 6,
    author: {
      name: "강AI",
      username: "kangai",
      profileImage: "https://picsum.photos/40/40?random=6",
      verified: true
    },
    content: "GPT-4의 새로운 기능들을 테스트해보고 있습니다. 코드 생성 능력이 정말 놀라워요! 🤖 #AI #MachineLearning #GPT4 #인공지능 #코딩",
    images: [],
    createdAt: "2024-01-14T22:30:00Z",
    likes: 156,
    retweets: 45,
    comments: 27,
    isLiked: true,
    isRetweeted: true
  },
  {
    id: 7,
    author: {
      name: "손보안",
      username: "sonsecurity",
      profileImage: "https://picsum.photos/40/40?random=7",
      verified: false
    },
    content: "웹 보안의 기본: HTTPS, CSRF, XSS 방어 방법들을 정리한 체크리스트를 만들었습니다. 개발자라면 꼭 알아야 할 내용들이에요 🔒 #Security #WebDev #보안 #웹개발 #사이버보안",
    images: ["https://picsum.photos/500/300?random=7"],
    createdAt: "2024-01-14T21:45:00Z",
    likes: 73,
    retweets: 19,
    comments: 9,
    isLiked: false,
    isRetweeted: false
  },
  {
    id: 8,
    author: {
      name: "윤DevOps",
      username: "yundevops",
      profileImage: "https://picsum.photos/40/40?random=8",
      verified: true
    },
    content: "Kubernetes 클러스터 관리가 점점 복잡해지고 있어요. Helm 차트를 활용한 배포 자동화 경험을 공유합니다! ⚙️ #Kubernetes #DevOps #클라우드 #컨테이너 #배포",
    images: [],
    createdAt: "2024-01-14T20:15:00Z",
    likes: 45,
    retweets: 11,
    comments: 6,
    isLiked: true,
    isRetweeted: false
  },
  {
    id: 9,
    author: {
      name: "임게임",
      username: "limgame",
      profileImage: "https://picsum.photos/40/40?random=9",
      verified: false
    },
    content: "Unity에서 2D 게임 개발 중입니다. 픽셀 아트와 애니메이션 최적화에 대한 팁들을 정리해봤어요! 🎮 #Unity #GameDev #2D #게임개발 #인디게임",
    images: ["https://picsum.photos/500/300?random=9"],
    createdAt: "2024-01-14T19:30:00Z",
    likes: 62,
    retweets: 15,
    comments: 8,
    isLiked: false,
    isRetweeted: true
  },
  {
    id: 10,
    author: {
      name: "조클라우드",
      username: "jocloud",
      profileImage: "https://picsum.photos/40/40?random=10",
      verified: true
    },
    content: "AWS Lambda와 API Gateway를 활용한 서버리스 아키텍처 구축 경험을 블로그에 정리했습니다. 비용 효율성이 정말 좋네요! ☁️ #AWS #Serverless #클라우드 #람다 #마이크로서비스",
    images: [],
    createdAt: "2024-01-14T18:45:00Z",
    likes: 91,
    retweets: 28,
    comments: 14,
    isLiked: true,
    isRetweeted: false
  },
  {
    id: 11,
    author: {
      name: "신블록체인",
      username: "shinblockchain",
      profileImage: "https://picsum.photos/40/40?random=11",
      verified: false
    },
    content: "스마트 컨트랙트 개발할 때 가스 최적화 방법들을 연구하고 있습니다. Solidity 코딩 패턴에 따라 비용이 크게 달라지네요! ⛓️ #Blockchain #Ethereum #블록체인 #암호화폐 #Web3",
    images: ["https://picsum.photos/500/300?random=11"],
    createdAt: "2024-01-14T17:20:00Z",
    likes: 38,
    retweets: 9,
    comments: 5,
    isLiked: false,
    isRetweeted: false
  },
  {
    id: 12,
    author: {
      name: "한테스트",
      username: "hantest",
      profileImage: "https://picsum.photos/40/40?random=12",
      verified: true
    },
    content: "TDD(Test-Driven Development) 적용 후 코드 품질이 정말 많이 향상됐습니다. Jest와 React Testing Library 조합 추천해요! 🧪 #TDD #Testing #테스트 #품질관리 #개발방법론",
    images: [],
    createdAt: "2024-01-14T16:10:00Z",
    likes: 54,
    retweets: 13,
    comments: 7,
    isLiked: true,
    isRetweeted: true
  }
];

// API 시뮬레이션 함수들
export const fetchPosts = async (page = 1, limit = 10): Promise<Post[]> => {
  // 스켈레톤 UI 시연을 위한 2초 지연
  await new Promise(resolve => setTimeout(resolve, 2000));
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return mockPosts.slice(startIndex, endIndex);
};

export const toggleLike = async (): Promise<{ success: boolean }> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { success: true };
};

export const toggleRetweet = async (): Promise<{ success: boolean }> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { success: true };
};

export const createPost = async (content: string, images: string[]): Promise<{ success: boolean; post?: Post }> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const newPost: Post = {
    id: Date.now(),
    author: currentUser,
    content,
    images,
    createdAt: new Date().toISOString(),
    likes: 0,
    retweets: 0,
    comments: 0,
    isLiked: false,
    isRetweeted: false
  };
  
  return { success: true, post: newPost };
};