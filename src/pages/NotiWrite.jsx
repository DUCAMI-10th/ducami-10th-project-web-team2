import { useState, useMemo } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import PenIcon from '../assets/pen.svg'; // ?react 없이 일반 경로로 import

const NotiWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const modules = useMemo(() => ({
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'align': [] }],
      ['image', 'link'],
    ],
  }), []);

  const handleSubmit = () => {
    console.log({ title, content });
    alert("등록되었습니다!");
    navigate('/noti');
  };

  return (
    <div className="w-full">
      
      <style>
        {`
          /* 1. 툴바 상단 둥글게 */
          .ql-toolbar.ql-snow {
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            border: 2px solid #D1D5DB; /* 제목창과 두께 맞춤 */
            padding: 12px !important;
          }

          /* 2. 본문 하단 둥글게 */
          .ql-container.ql-snow {
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            border: 2px solid #D1D5DB;
            font-size: 16px;
            min-height: 400px;
          }
        `}
      </style>

      <div className="bg-[#43B9A9] w-full py-12">
        <div className="max-w-screen-xl mx-auto px-6 flex justify-between items-center relative z-10">
          <div className="text-white">
            <p className="text-base opacity-80 font-medium">새로운 소식을 전해주세요.</p>
            <h1 className="text-4xl font-bold mt-2">공지사항 작성</h1>
          </div>

          <img
            src="/speaker.png"
            alt="speaker"
            className="w-48 h-48 object-contain"
          />
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-6 py-12">
        <input
          type="text"
          placeholder="제목을 입력해 주세요."
          className="w-full mb-6 p-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-[#43B9A9] placeholder-gray-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="mb-6">
          <ReactQuill
            theme="snow"
            modules={modules}
            value={content}
            onChange={setContent}
            placeholder="내용을 입력하세요"
            className="h-[500px] mb-12"
          />
        </div>

        <div className="flex justify-end gap-3 pt-5">
          <button
            onClick={() => navigate(-1)}
            className="px-10 py-2 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-50 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-10 py-2 bg-[#43B9A9] text-white rounded-md font-bold hover:bg-[#38a394] transition-colors shadow-sm"
          >
            <img src={PenIcon} alt="pen" className="w-6 h-6 brightness-0 invert" /> 등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotiWrite;