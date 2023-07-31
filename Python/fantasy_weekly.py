import pandas as pd

WEEK_MIN = 1
WEEK_MAX = 17

YEAR_MIN = 2016
YEAR_MAX = 2022

weeks = range(WEEK_MIN, WEEK_MAX)
years = range(YEAR_MIN, YEAR_MAX)

def main():
    for year in years:
        yearly_df = pd.DataFrame()
        
        for week in weeks:
            df = pd.read_csv(f'https://raw.githubusercontent.com/fantasydatapros/data/master/weekly/{year}/week{week}.csv')
            df['Year'] = year
            df['Week'] = week
            
            yearly_df = pd.concat([yearly_df, df])
    
        yearly_df.to_csv(f'FF_Weekly_{year}.csv', index=False)

main()
