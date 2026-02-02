import { useState, useMemo, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../api/axios';
import PenIcon from '../assets/pen.svg';
import toast from 'react-hot-toast'; //

const NotiWrite = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit'); //
  const isEditMode = !!editId;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`/api/notice/${editId}`);
          setTitle(response.data.title);
          setContent(response.data.content);
        } catch (err) {
          toast.error("기존 글을 불러오지 못했습니다."); //
        }
      };
      fetchPost();
    }
  }, [editId, isEditMode]);

  // 이모티콘 및 불필요한 기능을 제거한 툴바 구성
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'], //
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean']
    ],
  }), []);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("제목과 내용을 모두 입력해주세요."); //
      return;
    }

    // 전송 시 withCredentials가 포함된 인스턴스를 사용해야 합니다.
    const savePromise = isEditMode
      ? axios.put(`/api/notice/${editId}`, { title, content, author: "관리자" })
      : axios.post('/api/notice', { title, content, author: "관리자" });

    toast.promise(savePromise, {
      loading: '저장 중...',
      success: () => {
        navigate('/noti');
        return isEditMode ? '수정되었습니다! ✨' : '등록되었습니다! ✨';
      },
      error: (err) => {
        console.error("저장 실패 상세:", err.response);
        if (err.response?.status === 401) return `인증 세션이 만료되었습니다. \n 다시 로그인해주세요.`; //
        return '저장에 실패했습니다.';
      },
    });
  };

  return (
    <div className="w-full">
      <style>
        {`
          .ql-toolbar.ql-snow { border-top-left-radius: 8px; border-top-right-radius: 8px; border: 2px solid #D1D5DB; padding: 12px !important; }
          .ql-container.ql-snow { border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; border: 2px solid #D1D5DB; font-size: 16px; min-height: 400px; }
        `}
      </style>

      <div className="bg-[#43B9A9] w-full py-12">
        <div className="max-w-screen-xl mx-auto px-6 flex justify-between items-center relative z-10">
          <div className="text-white">
            <p className="text-base opacity-80 font-medium">
              {isEditMode ? "기존 내용을 수정합니다." : "새로운 소식을 전해주세요."}
            </p>
            <h1 className="text-4xl font-bold mt-2">
              {isEditMode ? "공지사항 수정" : "공지사항 작성"}
            </h1>
          </div>
          <img src="/speaker.png" alt="speaker" className="w-48 h-48 object-contain" />
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
            <img src={PenIcon} alt="pen" className="w-6 h-6 brightness-0 invert" />
            {isEditMode ? "수정완료" : "등록"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotiWrite;