export default {
  defaultBuilderData: {
    apiEndpoint: 'https://api.dune.com/api/v1/query/2360815/results?api_key=324WhvsCHWCji2pkgtfa0JDqDu8j0FdD',
    options: {
      title: 'ETH Withdrawals after Shanghai Unlock',
      options: {
        xColumn: {
          key: 'time',
          type: 'time'
        },
        yColumns: [
          'ETH',
        ],
        groupBy: 'category',
        stacking: true,
        legend: {
          show: true
        },
        seriesOptions: [
          {
            key: 'Reward',
            color: '#378944'
          },
          {
            key: 'Full Withdraw',
            color: '#b03030'
          }
        ],
        xAxis: {
          title: 'Date',
          tickFormat: 'MMM DD'
        },
        yAxis: {
          title: 'ETH',
          position: 'left',
          labelFormat: '0,000.ma'
        }
      }
    }
  }
}