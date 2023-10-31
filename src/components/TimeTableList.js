import { TimeTableItem } from './TimeTableItem';

export const TimeTableList = ({ list, localDateNow }) => {
  return (
    <section>
      {list.hour.map((TimeTableData, index) => {
        const date = new Date(TimeTableData.time);
        if (list.isToday) {
          if (date > localDateNow) {
            return (
              <TimeTableItem
                key={TimeTableData.time_epoch}
                timeData={TimeTableData}
                hours={date.getHours()}
              />
            );
          }
        } else {
          if (index % 4 === 0) {
            return (
              <TimeTableItem
                key={TimeTableData.time_epoch}
                timeData={TimeTableData}
                hours={date.getHours()}
              />
            );
          }
        }
      })}
    </section>
  );
};
