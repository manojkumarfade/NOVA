import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FirewallSettings = () => {
  const [firewallEnabled, setFirewallEnabled] = useState(true);
  const [allowList, setAllowList] = useState([
    { id: 1, value: 'amazon.com', type: 'domain', enabled: true },
    { id: 2, value: 'google.com', type: 'domain', enabled: true },
    { id: 3, value: 'github.com', type: 'domain', enabled: true }
  ]);
  const [denyList, setDenyList] = useState([
    { id: 1, value: 'malicious-site.com', type: 'domain', enabled: true },
    { id: 2, value: '192.168.1.100', type: 'ip', enabled: true }
  ]);
  const [newAllowEntry, setNewAllowEntry] = useState('');
  const [newDenyEntry, setNewDenyEntry] = useState('');
  const [saveStatus, setSaveStatus] = useState('');

  const handleAddToAllowList = () => {
    if (!newAllowEntry?.trim()) return;
    
    const newEntry = {
      id: Date.now(),
      value: newAllowEntry?.trim(),
      type: newAllowEntry?.includes('.') && !newAllowEntry?.match(/^\d+\.\d+\.\d+\.\d+$/) ? 'domain' : 'ip',
      enabled: true
    };
    
    setAllowList(prev => [...prev, newEntry]);
    setNewAllowEntry('');
  };

  const handleAddToDenyList = () => {
    if (!newDenyEntry?.trim()) return;
    
    const newEntry = {
      id: Date.now(),
      value: newDenyEntry?.trim(),
      type: newDenyEntry?.includes('.') && !newDenyEntry?.match(/^\d+\.\d+\.\d+\.\d+$/) ? 'domain' : 'ip',
      enabled: true
    };
    
    setDenyList(prev => [...prev, newEntry]);
    setNewDenyEntry('');
  };

  const handleRemoveFromAllowList = (id) => {
    setAllowList(prev => prev?.filter(item => item?.id !== id));
  };

  const handleRemoveFromDenyList = (id) => {
    setDenyList(prev => prev?.filter(item => item?.id !== id));
  };

  const handleToggleAllowEntry = (id) => {
    setAllowList(prev => prev?.map(item => 
      item?.id === id ? { ...item, enabled: !item?.enabled } : item
    ));
  };

  const handleToggleDenyEntry = (id) => {
    setDenyList(prev => prev?.map(item => 
      item?.id === id ? { ...item, enabled: !item?.enabled } : item
    ));
  };

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };

  const ListItem = ({ item, onToggle, onRemove, listType }) => (
    <div className={`
      flex items-center gap-3 p-3 rounded-lg border transition-base
      ${item?.enabled ? 'bg-card border-border' : 'bg-muted border-muted-foreground/20 opacity-60'}
    `}>
      <Checkbox
        checked={item?.enabled}
        onChange={() => onToggle(item?.id)}
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Icon 
            name={item?.type === 'domain' ? 'Globe' : 'Network'} 
            size={16} 
            className="text-muted-foreground flex-shrink-0"
          />
          <span className="text-sm font-caption text-foreground truncate">
            {item?.value}
          </span>
        </div>
      </div>

      <button
        onClick={() => onRemove(item?.id)}
        className="p-1.5 hover:bg-error/10 rounded transition-base"
        aria-label="Remove entry"
      >
        <Icon name="Trash2" size={16} className="text-error" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="bg-card border border-border rounded-lg p-4 md:p-6 elevation-sm">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Icon name="Shield" size={20} color="var(--color-primary)" />
          </div>
          <div className="flex-1">
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Firewall Protection
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Control which domains and IPs AgenticBrowser can access
            </p>
          </div>
        </div>

        <Checkbox
          label="Enable Firewall"
          description="Enforce allow/deny lists before navigation. Disabled firewall allows all navigation."
          checked={firewallEnabled}
          onChange={(e) => setFirewallEnabled(e?.target?.checked)}
        />
      </div>
      {firewallEnabled && (
        <>
          <div className="bg-card border border-border rounded-lg p-4 md:p-6 elevation-sm">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10">
                <Icon name="CheckCircle2" size={20} color="var(--color-accent)" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
                  Allow List
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Domains and IPs that are always permitted
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="text"
                  value={newAllowEntry}
                  onChange={(e) => setNewAllowEntry(e?.target?.value)}
                  placeholder="Enter domain or IP address"
                  onKeyPress={(e) => e?.key === 'Enter' && handleAddToAllowList()}
                  className="flex-1"
                />
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={handleAddToAllowList}
                  disabled={!newAllowEntry?.trim()}
                  className="w-full sm:w-auto"
                >
                  Add
                </Button>
              </div>

              <div className="space-y-2">
                {allowList?.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No entries in allow list
                  </div>
                ) : (
                  allowList?.map(item => (
                    <ListItem
                      key={item?.id}
                      item={item}
                      onToggle={handleToggleAllowEntry}
                      onRemove={handleRemoveFromAllowList}
                      listType="allow"
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4 md:p-6 elevation-sm">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-error/10">
                <Icon name="XCircle" size={20} color="var(--color-error)" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
                  Deny List
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Domains and IPs that are always blocked
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="text"
                  value={newDenyEntry}
                  onChange={(e) => setNewDenyEntry(e?.target?.value)}
                  placeholder="Enter domain or IP address"
                  onKeyPress={(e) => e?.key === 'Enter' && handleAddToDenyList()}
                  className="flex-1"
                />
                <Button
                  variant="destructive"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={handleAddToDenyList}
                  disabled={!newDenyEntry?.trim()}
                  className="w-full sm:w-auto"
                >
                  Add
                </Button>
              </div>

              <div className="space-y-2">
                {denyList?.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No entries in deny list
                  </div>
                ) : (
                  denyList?.map(item => (
                    <ListItem
                      key={item?.id}
                      item={item}
                      onToggle={handleToggleDenyEntry}
                      onRemove={handleRemoveFromDenyList}
                      listType="deny"
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="bg-muted border border-border rounded-lg p-4 md:p-6">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm text-foreground font-caption font-medium">
                  Firewall Rules
                </p>
                <ul className="text-xs md:text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Deny list takes precedence over allow list</li>
                  <li>Wildcards are supported: *.example.com blocks all subdomains</li>
                  <li>IP ranges can be specified: 192.168.1.0/24</li>
                  <li>Disabled entries are ignored but preserved in the list</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
        <Button
          variant="default"
          iconName="Save"
          iconPosition="left"
          onClick={handleSave}
          loading={saveStatus === 'saving'}
          className="flex-1 sm:flex-initial"
        >
          {saveStatus === 'saved' ? 'Saved Successfully' : 'Save Changes'}
        </Button>

        {saveStatus === 'saved' && (
          <div className="flex items-center gap-2 text-accent text-sm font-caption">
            <Icon name="CheckCircle2" size={16} />
            <span>Firewall rules saved</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirewallSettings;