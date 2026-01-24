import React from 'react';

const Home = () => {
  return (
    // 전체 콘텐츠를 감싸는 컨테이너 (중앙 정렬 및 최대 너비 제한)
    <div className="max-w-screen-xl mx-auto">

      {/*상단 타이틀*/}
      <section className="py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          교육의 시작, <br className="md:hidden" /> {/* 모바일에서만 줄바꿈 */}
          <span className="text-[#43B9A9]">두카미</span>의 시작
        </h1>
        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          교육 봉사를 통해 지식을 나누고, 함께 성장하는 방법을 나눠요.<br />
          "배우고, 나누고, 성장하는 개발자"가 되고 싶다면, 우리 동아리에서 함께해요
        </p>
      </section>

      {/*섹션 2: 좌측 텍스트 / 우측 이미지*/}
      <section className="py-16 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* 텍스트 영역 */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug">
            <span className="text-[#43B9A9]">두카미</span>는 대구소프트웨어마이스터고의<br />
            교육 봉사 동아리로, 청소년들에게 소프트웨어<br />
            교육 봉사 활동을 위해 모인 동아리입니다.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            주로 소프트웨어나 코딩 분야에 관심있는<br className="hidden md:block" /> {/* PC에서만 줄바꿈 */}
            중학생들 대상으로 교육 봉사 활동을 하고 있습니다.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center w-full">
          <img
            src="/job.jpg"
            alt="활동 사진"
            className="w-full max-w-xl h-64 md:h-80 rounded-[30px] object-cover shadow-md border border-gray-100"
          />
        </div>
      </section>

      {/* 섹션 3: 좌측 이미지 / 우측 텍스트  */}
      <section className="py-16 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2 flex justify-center w-full">
          <img
            src="/creative.jpg"
            alt="어린이날 창의융합 체험 활동 "
            className="w-full max-w-xl h-64 md:h-80 rounded-[30px] object-cover shadow-md border border-gray-100"
          />
        </div>

        {/* 텍스트 영역 (PC에서는 우측 정렬) */}
        <div className="md:w-1/2 space-y-6 md:text-right">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-snug">
            <span className="text-[#43B9A9]">두카미</span>는 단순히 지식을 전달하는 것을 넘어,<br />
            함께 성장하는 배움을 만들어 나갑니다.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            학생과 멘토가 서로 배우고 나누는 과정 속에서,<br />
            교육의 의미를 다시 발견해 나갑니다.<br />
            작은 수업 하나가 누군가의 미래에 큰 힘이<br />
            될 수 있다고 믿습니다.
          </p>
        </div>
      </section>

      {/* 하단 여백 추가 */}
      <div className="pb-20"></div>
    </div>
  );
};

export default Home;