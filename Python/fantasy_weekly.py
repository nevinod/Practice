import pandas as pd

weeks = range(1, 17)
years = range(2016, 2022)

def main():
    for year in years:
        yearly_df = pd.DataFrame()
        
        for week in weeks:
            df = pd.read_csv(f'https://raw.githubusercontent.com/fantasydatapros/data/master/weekly/{year}/week{week}.csv')
            df['Year'] = year
            yearly_df = pd.concat([yearly_df, df])
    
        yearly_df.to_csv(f'Fantasy_{year}.csv')

main()
