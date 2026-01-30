import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import AnalyticsDashboard from './pages/analytics-dashboard';
import HistorySearchInterface from './pages/history-search-interface';
import ModelConfiguration from './pages/model-configuration';
import SettingsDashboard from './pages/settings-dashboard';
import MainChatInterface from './pages/main-chat-interface';
import TabManagementView from './pages/tab-management-view';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<MainChatInterface />} />
          <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
          <Route path="/history-search-interface" element={<HistorySearchInterface />} />
          <Route path="/model-configuration" element={<ModelConfiguration />} />
          <Route path="/settings-dashboard" element={<SettingsDashboard />} />
          <Route path="/main-chat-interface" element={<MainChatInterface />} />
          <Route path="/tab-management-view" element={<TabManagementView />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
