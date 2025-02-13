/*!
 * Copyright 2024, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
  useEffect(() => {
    if (widgetApi) {
      widgetApi.getUserInformation().then((user) => {
        setUser(user);
      });
    }
  }, [widgetApi]);
  return (
    <div>
      Hello {message} {contentLanguage}
      <p>test</p>
      <p>{user?.id}</p>
    </div>
  );
};
