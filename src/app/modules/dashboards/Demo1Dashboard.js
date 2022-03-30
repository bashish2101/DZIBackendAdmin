import React, { useEffect } from "react";
import {
    MixedWidget1,
    MixedWidget14,
    ListsWidget9,
    StatsWidget11,
    StatsWidget12,
    ListsWidget1,
    AdvanceTablesWidget2,
    AdvanceTablesWidget4,
    ListsWidget3,
    ListsWidget4,
    ListsWidget8
} from "../../../_metronic/_partials/widgets";
import { getTotalUserCountAsync } from '../dashboards/redux/dashboardApi';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_metronic/_helpers";

export function Demo1Dashboard() {

    const dispatch = useDispatch()

    const { userCountLoader, userCountData } = useSelector((state) => state.dashboard, shallowEqual);

    useEffect(() => {
        dispatch(getTotalUserCountAsync())
    }, [])


    return (<>
        <div className="row">
            <div className="col-lg-6 col-xxl-4">
                <div className="d-flex justify-content-around bg-white px-6 py-8 rounded-xl mb-7">
                    <span className="svg-icon svg-icon-6x svg-icon-primary d-block my-2">
                        <SVG
                            src={toAbsoluteUrl(
                                "/media/svg/icons/Communication/Add-user.svg"
                            )}
                        >
                        </SVG>
                    </span>
                    <div>
                        <div
                            className="text-primary font-weight-bold font-size-h6 mt-2"
                        >
                            Total Users
                        </div>
                        <a
                            href="#"
                            className="text-primary font-weight-bold font-size-h2 mt-2"
                        >
                            {userCountData.totalUsers}
                        </a>
                        {userCountLoader && (
                            <span className="ml-3 spinner spinner-dark"></span>
                        )}
                    </div>
                </div>
            </div>
            {/* <div className="col-lg-6 col-xxl-4">
                <MixedWidget1 className="card-stretch gutter-b" />
            </div> */}
            {/* <div className="col-lg-6 col-xxl-4">
                <ListsWidget9 className="card-stretch gutter-b" />
            </div> */}

            {/* <div className="col-lg-6 col-xxl-4">
                <StatsWidget11 className="card-stretch card-stretch-half gutter-b" />
                <StatsWidget12 className="card-stretch card-stretch-half gutter-b" />
            </div> */}

            {/* <div className="col-lg-6 col-xxl-4 order-1 order-xxl-1">
                <ListsWidget1 className="card-stretch gutter-b" />
            </div>


            <div className="col-lg-6 col-xxl-4 order-1 order-xxl-2">
                <ListsWidget4 className="card-stretch gutter-b" />
            </div>


            <div className="col-lg-12 col-xxl-4 order-1 order-xxl-2">
                <MixedWidget14 className="card-stretch gutter-b" />
            </div> */}

        </div>
    </>);
}
