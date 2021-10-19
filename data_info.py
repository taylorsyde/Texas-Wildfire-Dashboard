from sqlalchemy import create_engine
import os 
import pandas as pd

connect_string = os.getenv('DATABASE_URL2', '')
print("conn string", connect_string)
engine = create_engine(connect_string)

def get_spi():
    sql = """
    Select * from spi
    """
    results_df = pd.read_sql(sql, con=engine)
    results = results_df.to_dict(orient='records')
    return results

def get_paleo():
    sql = """
    Seelect * from paleo
    """

    results_df = pd.read_sql(sql, con=engine)
    p_results = results_df.to_dict(orient='records')
    return p_results

def get_acres_cause():
    sql = """
    Seelect * from acres_by_cause
    """

    results_df = pd.read_sql(sql, con=engine)
    AC_results = results_df.to_dict(orient='records')
    return AC_results

def get_acres_class():
    sql = """
    Seelect * from acres_by_class
    """

    results_df = pd.read_sql(sql, con=engine)
    AClass_results = results_df.to_dict(orient='records')
    return AClass_results

def get_acres_year():
    sql = """
    Seelect * from acres_by_year
    """

    results_df = pd.read_sql(sql, con=engine)
    AY_results = results_df.to_dict(orient='records')
    return AY_results

def get_texas_fires():
    sql = """
    Seelect * from texas_fires
    """

    results_df = pd.read_sql(sql, con=engine)
    TF_results = results_df.to_dict(orient='records')
    return TF_results

def get_years():
    sql = """
    Seelect * from year_ranges
    """

    results_df = pd.read_sql(sql, con=engine)
    year_results = results_df.to_dict(orient='records')
    return year_results

if __name__ == '__main__':
    info = get_spi()
    print(info)