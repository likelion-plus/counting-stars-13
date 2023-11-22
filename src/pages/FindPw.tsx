import PageMainTitle from 'components/PageMainTitle';

export default function FindPw() {
  return (
    <>
      <main className="w-full min-h-[60vh]">
        <section>
          <PageMainTitle title="비밀번호 찾기" />
          <article className="w-4/5 min-h-[60vh] mx-auto border border-gray-300 flex flex-col justify-center">
            <table className="mx-auto">
              <tbody>
                <tr>
                  <td className="w-20">
                    <label htmlFor="inputId">아이디</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="border border-gray-300 rounded w-60 mb-2"
                      id="inputId"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="inputName">이름</label>
                  </td>
                  <td className="">
                    <input
                      type="text"
                      className="border border-gray-300 rounded w-60 mb-2"
                      id="inputName"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="inputEmail">이메일</label>
                  </td>
                  <td className="">
                    <input
                      type="text"
                      className="border border-gray-300 rounded w-60 mb-2"
                      id="inputEmail"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="block text-white bg-slate-500 py-2 px-8 mt-4 w-80 mx-auto">
              확인
            </button>
          </article>
        </section>
      </main>
    </>
  );
}
