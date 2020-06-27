import React, {useCallback, useEffect, useState} from "react";


export const usePagination = () => {
    const [pagePagination, setPagePagination] = useState([]),
        [indicators, setIndicators] = useState([]),
        [count, setCount] = useState(0)

    const Liter = ({subprops}) => {
        const [active, setActive] = useState(subprops.active);

        const clickHandler = () => {
            setCount(+subprops.i);
            setActive("active");
        };

        return <li className={active} onClick={clickHandler}><a>{+subprops.i + 1}</a></li>
    };

    const selector = () => {
        if(pagePagination.length <= 1) return;

        return (
            <div className="pagination-box">
                <ul className="pagination">
                    <li className={count === 0 ? "disabled" : "waves-effect"} onClick={left}><i className="material-icons">chevron_left</i></li>
                    {
                        indicators
                    }
                    <li className={count === pagePagination.length - 1 ? "disabled" : "waves-effect"} onClick={right}><i className="material-icons">chevron_right</i></li>
                </ul>
            </div>
        )
    }

    const init = useCallback((rev, iter=5) => {
        let pagination = [], indicator = [];

        for(let i = 0; i < Math.ceil(rev.length / iter); i++) {
            pagination.push(rev.slice((i * iter), (i * iter) + iter));

            if(i === 0) {
                indicator.push(<Liter key={i} subprops={{i, active: "active"}}/>)
            } else {
                indicator.push(<Liter key={i} subprops={{i, active: "waves-effect"}}/>);
            }
        }

        setPagePagination(pagination);
        setIndicators(indicator);
    }, [setPagePagination, setIndicators])

    const left = useCallback((event) => {
        if(event.target.parentElement.classList.contains("disabled")) return;

        return count === 0 ? setCount(count) : setCount(count - 1);
    },[count, setCount])

    const right = useCallback((event) => {
        if(event.target.parentElement.classList.contains("disabled")) return;

        return count === pagePagination.length - 1 ? setCount(pagePagination.length - 1) : setCount(count + 1);
    }, [count, setCount])

    useEffect(() => {
        console.log(indicators)
        setIndicators(ind => {
            return ind.map(i => {
                if(+i.key === count){
                    i = <Liter key={i.key} subprops={{i: i.key, active: "active"}}/>;
                } else {
                    i = <Liter key={i.key} subprops={{i: i.key, active: "waves-effect"}}/>;
                }

                return i;
            })
        });
    }, [count]);

    return {init, pagePagination, count, selector};
}