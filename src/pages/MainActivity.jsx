import React from 'react';

const MainActivity = () => {
  const activityData = [
    {
      id: 1,
      title: "직업진로체험",
      description: "중학생들에게 친숙한 공룡 게임을 Python과 C언어, 두 가지 방식으로 제작하는 실습 활동입니다.",
      images: ["/job.jpg", "/job2.jpg", "/job3.jpg", "/job4.jpg","/job5.jpg",]
    },
    {
      id: 2,
      title: "직업교육박람회",
      description: "엑스코에서 열리는 직업교육박람회에 참가하여 홍보 및 체험 부스를 운영합니다.",
      images: ["/jobFair.jpg", "/jobFair_2.jpg", "/jobFair_3.jpg", "/jobFair_4.jpg", "/jobFair_5.jpg",]
    },
    {
      id: 3,
      title: "어린이날 창의융합놀이터 행사",
      description: "5월 5일 어린이날 창의융합놀이터 행사 부스 운영합니다.",
      images: ["/creative.jpg", "/creative2.jpg", "/creative3.jpg", "/creative4.jpg","/creative5.jpg",]
    }
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16 md:py-24">
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      <div className="space-y-24">
        {activityData.map((activity) => (
          <section key={activity.id} className="flex flex-col space-y-6">
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {activity.title}
            </h2>

            <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide cursor-grab active:cursor-grabbing">
              {activity.images.map((img, index) => (
                <div 
                  key={index} 
                  className="flex-none w-80 h-52 md:w-96 md:h-64 bg-gray-200 rounded-xl overflow-hidden shadow-sm border-3 border-[#43B9A9] relative"
                >
                  <img 
                    src={img} 
                    alt={`${activity.title} 사진 ${index + 1}`} 

                    className={`w-full h-full object-cover ${
                      (activity.id === 2 && (index === 3 || index === 4)) 
                        ? "object-[50%_25%]" 
                        : "object-center"
                    }`}
                  />
                </div>
              ))}
            </div>

            <p className="text-lg text-gray-700 font-medium">
              {activity.description}
            </p>
          </section>
        ))}
      </div>
      
      <div className="pb-20"></div>
    </div>
  );
};

export default MainActivity;