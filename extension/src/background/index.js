import { agentService } from '../services/AgentService';
import { FirewallService } from '../services/FirewallService';

console.log('Nova Browser Agent: Service Worker Started');

FirewallService.init();

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));

chrome.runtime.onInstalled.addListener(() => {
    console.log('Nova Browser Agent Installed');
});
