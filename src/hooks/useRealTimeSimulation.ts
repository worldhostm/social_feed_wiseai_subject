'use client';

import { useEffect, useCallback } from 'react';
import { usePosts } from '@/contexts/PostContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { Post } from '@/data/mockData';

// 시뮬레이션용 랜덤 포스트 내용
const simulationPosts = [
  "새로운 JavaScript 프레임워크가 출시되었네요! 🚀 #JavaScript #웹개발",
  "오늘 배운 React Hook 패턴을 공유합니다 💡 #React #개발팁",
  "TypeScript 5.0의 새로운 기능들이 정말 인상적이에요 ⚡ #TypeScript #개발",
  "Next.js App Router 마이그레이션 완료! 성능이 확실히 개선됐습니다 📈 #NextJS #성능최적화",
  "CSS Grid vs Flexbox, 언제 뭘 써야 할까요? 🤔 #CSS #프론트엔드",
  "GitHub Actions로 CI/CD 파이프라인 구축하기 🔧 #DevOps #자동화",
  "모바일 퍼스트 디자인의 중요성을 다시 한번 느꼈습니다 📱 #반응형웹 #UX",
  "웹 접근성 개선 작업 진행 중입니다 ♿ #웹접근성 #포용성",
  "PWA 구현으로 네이티브 앱 같은 경험 제공! 🎯 #PWA #웹앱",
  "코드 리뷰 문화가 팀 성장에 미치는 영향 🔍 #코드리뷰 #팀워크"
];

// 랜덤 작성자 생성
const getRandomAuthor = () => {
  const names = ["김개발", "이디자인", "박백엔드", "최모바일", "정데이터", "강AI", "손보안", "윤DevOps", "임게임", "조클라우드"];
  const usernames = ["kimdev", "leedesign", "parkbackend", "choimobile", "jungdata", "kangai", "sonsecurity", "yundevops", "limgame", "jocloud"];
  const randomIndex = Math.floor(Math.random() * names.length);
  
  return {
    name: names[randomIndex],
    username: usernames[randomIndex],
    profileImage: `https://picsum.photos/40/40?random=${randomIndex + 100}`,
    verified: Math.random() > 0.7, // 30% 확률로 인증 계정
  };
};

export function useRealTimeSimulation() {
  const { addPost } = usePosts();
  const { addNotification } = useNotifications();

  const generateRandomPost = useCallback((): Post => {
    const randomContent = simulationPosts[Math.floor(Math.random() * simulationPosts.length)];
    const hasImage = Math.random() > 0.6; // 40% 확률로 이미지 포함
    
    return {
      id: Date.now() + Math.random(), // 고유 ID 생성
      author: getRandomAuthor(),
      content: randomContent,
      images: hasImage ? [`https://picsum.photos/500/300?random=${Date.now()}`] : [],
      createdAt: new Date().toISOString(),
      likes: Math.floor(Math.random() * 50),
      retweets: Math.floor(Math.random() * 20),
      comments: Math.floor(Math.random() * 15),
      isLiked: false,
      isRetweeted: false,
    };
  }, []);

  const simulateNewPost = useCallback(() => {
    const newPost = generateRandomPost();
    addPost(newPost);
    addNotification('new_post', `${newPost.author.name}님이 새 글을 작성했습니다`);
  }, [generateRandomPost, addPost, addNotification]);

  useEffect(() => {
    // 30초마다 새 포스트 시뮬레이션 (랜덤 간격: 20~40초)
    const scheduleNextPost = () => {
      const randomDelay = 20000 + Math.random() * 20000; // 20-40초
      return setTimeout(() => {
        simulateNewPost();
        scheduleNextPost(); // 다음 포스트 스케줄링
      }, randomDelay);
    };

    const timeoutId = scheduleNextPost();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [simulateNewPost]);

  return {
    simulateNewPost, // 수동으로 새 포스트 생성할 수 있는 함수
  };
}