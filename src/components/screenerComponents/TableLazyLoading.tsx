import React, { memo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TableLazyLoading = (props: { isLoggedIn: boolean }) => (
  <>
    {[...Array(10).keys()].map((index) => {
      return (
        <React.Fragment key={index}>
          <tr>
            <td>
              <Skeleton  height={10}/>
              <Skeleton width="60%" height={10} />
            </td>
            <td>
              <Skeleton />
              <Skeleton width="0%" />
            </td>
            <td>
              <Skeleton />
              <Skeleton width="0%" />
            </td>
            <td>
              <Skeleton />
              <Skeleton width="0%" />
            </td>
            <td>
              <Skeleton />
              <Skeleton width="0%" />
            </td>
            <td>
              <Skeleton />
              <Skeleton width="0%" />
            </td>
            {/* {props.isLoggedIn && (
              <td>
                <Skeleton />
                <Skeleton width="0%" />
              </td>
            )} */}
          </tr>
          {index === 3 && (
            <tr key={"spinner"}>
              <td colSpan={7}>
                <div className="d-flex justify-content-center align-items-center">
                  <FontAwesomeIcon
                    icon={faGear}
                    className="rotate-infinite me-2"
                  />
                  <span className="fs-6">Loading...</span>
                </div>
              </td>
            </tr>
          )}
        </React.Fragment>
      );
    })}
  </>
);

export default memo(TableLazyLoading);