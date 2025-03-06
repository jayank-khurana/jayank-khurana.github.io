import React, { useState, useEffect, ReactElement } from "react";
import { SBUserProfile, WidgetApi } from "widget-sdk";

/**
 * React Component
 */
export interface ReachWidgetProps {
  widgetApi: WidgetApi;
  message: string;
  contentLanguage: string;
}

export const ReachWidget = ({
  message,
  contentLanguage,
  widgetApi,
}: ReachWidgetProps): ReactElement => {
  const [user, setUser] = useState<SBUserProfile | null>(null);
  const [reportData, setReportData] = useState<any>(null);

  useEffect(() => {
    if (widgetApi) {
      widgetApi.getUserInformation().then((user) => {
        setUser(user);
      });
    }

    console.log("Making fetch call");
    fetch("https://api.reach360.com/reports/learners/00umoc0sy8Jmu22aS2p7", {
      headers: {
        Authorization:
          "Bearer c5a7bad1-817e-4710-894b-7a8b152d068d.v4uciyp8RG2jzNfcXuiyRV4HuOvLnDSKS7u9boofSOaBKO",
      },
    })
      .then((response) => {
        console.log("Fetch response:", response);
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data); // Debugging log
        setReportData(data);
      })
      .catch((error) => console.error("Error fetching report data:", error));
  }, [widgetApi]);

  useEffect(() => {
    console.log("Report data state:", reportData); // Debugging log
  }, [reportData]);

  return (
    <div>
      Hello {message} {contentLanguage}
      <p>test</p>
      <p>{user?.id}</p>
      <div>
        <h3>Report Data:</h3>
        {reportData && reportData.courses ? (
          <ul>
            {reportData.courses.map((course: any) => (
              <li key={course.courseId}>
                <h4>{course.courseTitle}</h4>
                <p>Status: {course.status}</p>
                <p>Progress: {course.progress}%</p>
                <p>Last Activity: {course.lastActivity}</p>
                <p>Completed At: {course.completedAt}</p>
                <a
                  href={course.courseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Course Link
                </a>
                <a
                  href={course.courseReportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Report Link
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No report data available.</p>
        )}
      </div>
    </div>
  );
};
