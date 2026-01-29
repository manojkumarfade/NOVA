import React from 'react';


const TimelineVisualization = ({ 
  timelineData = [],
  onPeriodClick,
  className = '' 
}) => {
  const getActivityLevel = (count) => {
    if (count === 0) return 'bg-muted';
    if (count <= 5) return 'bg-primary/20';
    if (count <= 10) return 'bg-primary/40';
    if (count <= 20) return 'bg-primary/60';
    return 'bg-primary';
  };

  const getDayLabel = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days?.[new Date(date)?.getDay()];
  };

  return (
    <div className={`bg-card border border-border rounded-lg elevation-sm p-4 md:p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-1">
            Browsing Timeline
          </h2>
          <p className="text-sm text-muted-foreground">
            Your activity patterns over the past 90 days
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 5, 10, 20, 30]?.map((count, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-sm ${getActivityLevel(count)}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-1 min-w-full">
          {['Mon', 'Wed', 'Fri']?.map((day, dayIndex) => (
            <div key={day} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-8 text-right">
                {day}
              </span>
              <div className="flex gap-1">
                {timelineData?.slice(dayIndex * 30, (dayIndex + 1) * 30)?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => onPeriodClick(item)}
                    className={`
                      w-3 h-3 md:w-4 md:h-4 rounded-sm transition-base hover:ring-2 hover:ring-ring
                      ${getActivityLevel(item?.count)}
                    `}
                    title={`${item?.date}: ${item?.count} visits`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="flex flex-col">
          <span className="text-2xl md:text-3xl font-heading font-bold text-foreground">
            {timelineData?.reduce((sum, item) => sum + item?.count, 0)}
          </span>
          <span className="text-xs md:text-sm text-muted-foreground">Total Visits</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl md:text-3xl font-heading font-bold text-foreground">
            {Math.round(timelineData?.reduce((sum, item) => sum + item?.count, 0) / 90)}
          </span>
          <span className="text-xs md:text-sm text-muted-foreground">Daily Average</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl md:text-3xl font-heading font-bold text-foreground">
            {Math.max(...timelineData?.map(item => item?.count))}
          </span>
          <span className="text-xs md:text-sm text-muted-foreground">Peak Day</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl md:text-3xl font-heading font-bold text-foreground">
            {timelineData?.filter(item => item?.count > 0)?.length}
          </span>
          <span className="text-xs md:text-sm text-muted-foreground">Active Days</span>
        </div>
      </div>
    </div>
  );
};

export default TimelineVisualization;
