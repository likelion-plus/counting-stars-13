import { useState, useEffect } from 'react';

interface optionObject {
  [key: string]: string;
}

function DetailProductSelect({ data, option }: { data: any; option: any }) {
  const [info] = useState({});
  const [count, setCount] = useState({} as number[]);
  const [selectOption, setSelectOption] = useState([]);

  useEffect(() => {
    option.map((item: string | optionObject) => {
      console.log(item);
      if (typeof item === 'string') {
        info[item] = data.price;
        count[item] = 0;
      }
      if (item instanceof Object) {
        const optionName = Object.values(item)[0];
        if (!optionName.includes('+')) {
          info[optionName] = data.price;
          count[optionName] = 0;
          return;
        }

        if (optionName.includes('-')) {
          const price = +optionName.split('-')[1].replace(/[^0-9]/g, '');
          info[optionName] = data.price - price;
          count[optionName] = 0;
          return;
        }

        if (optionName.includes('+')) {
          const price = +optionName.split('+')[1].replace(/[^0-9]/g, '');
          info[optionName] = price + data.price;
          count[optionName] = 0;
        }
      }
    });
  }, [option, data.price, info]);

  const handleClickUp = (item: string) => {
    if (count[item] > 98) return;
    setCount(() => ({ ...count, ...count[item]++ }));
  };

  const handleClickDown = (item: string) => {
    if (count[item] < 2) return;
    setCount(() => ({ ...count, ...count[item]-- }));
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectOption.includes(e.target.value) || e.target.value === '') return;
    setSelectOption(selectOption.concat(e.target.value));
  };

  return (
    <>
      <fieldset className="py-5 flex">
        <label htmlFor="selectOption" className="w-32">
          옵션 선택
        </label>
        <select
          name="selectOption"
          id="selectOption"
          onChange={handleSelect}
          className="border border-gray-300 grow p-1"
        >
          <option value="">[필수] 옵션을 선택해 주세요</option>
          <option value="" disabled>
            ---
          </option>

          {option[0] instanceof Object && (
            <optgroup label={Object.keys(option[0])[0]}>
              {option.map((item: optionObject, index: number) => {
                return (
                  <option key={index} value={item[Object.keys(option[0])[0]]}>
                    {item[Object.keys(option[0])[0]]}
                  </option>
                );
              })}
            </optgroup>
          )}

          {typeof option[0] === 'string' &&
            option.map((item: string, index: number) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
        </select>
      </fieldset>
      {selectOption.length > 0 &&
        selectOption.map((item: string, index) => (
          <fieldset
            key={index}
            className="border-b border-t border-t-gray-500 border-b-gray-500 py-3 flex justify-between items-center"
          >
            <div className="min-w-[50%]">
              <p className="text-sm">{data?.name}</p>
              <span className="text-xs">{item}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex border-2 h-9 rounded-lg justify-around mb-2">
                <input
                  type="text"
                  className="w-9 pl-1"
                  value={count[item]}
                  readOnly
                />
                <div className="flex flex-col gap-2 justify-center">
                  <button type="button" onClick={() => handleClickUp(item)}>
                    <img src="/cartArrowUp.png" className="w-3" />
                  </button>
                  <button type="button" onClick={() => handleClickDown(item)}>
                    <img src="/cartArrowDown.png" className="w-3" />
                  </button>
                </div>
              </div>
              {data?.options.length > 0 && (
                <button type="button">
                  <img src="/cancel.png" alt="옵션 닫기" className="w-4" />
                </button>
              )}
            </div>
            {!item.includes('+') && (
              <span className="text-sm">{data.price.toLocaleString()} 원</span>
            )}
            {item.includes('+') && (
              <span className="text-sm">{info[item].toLocaleString()}원</span>
            )}
          </fieldset>
        ))}
      <p className="py-6 border-b border-b-gray-300">
        <span className="font-bold">총 상품 금액</span>&#40;수량&#41; :
        <span className="font-bold text-2xl pl-2">
          {Object.entries(count)
            .reduce((acc, cur) => {
              return acc + cur[1] * info[cur[0]];
            }, 0)
            .toLocaleString()}
          원
        </span>
        &#40;
        {Object.entries(count)
          .reduce((acc, cur) => {
            return acc + cur[1];
          }, 0)
          .toLocaleString()}
        개&#41;
      </p>
    </>
  );
}

export default DetailProductSelect;
