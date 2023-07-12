# This is logic behind the search function where if user search an equipment number, it sees if the equipment number matches the one in the inventory
#Example case is used where equipment_number is set to 000007 and as that matches the inventory, it will display equipment information

# Import necessary modules and libraries

#this is the data taken from sheet 1 called VehicleList
equipment_list = [                     
    {"EQP_NR": "000001", "MTN_FAC_MNM_NA": "KYACD", "EQP_CGP_CD": "HTCTX", "EQP_MDL_YR_DT": 2018, "EQP_MNU_ABR_NA": "FRGHT", "Engine": "CUMMINS WESTPORT 12G", "EQP_CSF_TYP_CD": "TR"},
    {"EQP_NR": "000002", "MTN_FAC_MNM_NA": "KYACD", "EQP_CGP_CD": "HTCTX", "EQP_MDL_YR_DT": 2018, "EQP_MNU_ABR_NA": "FRGHT", "Engine": "CUMMINS WESTPORT 12G", "EQP_CSF_TYP_CD": "TR"},
    {"EQP_NR": "000003", "MTN_FAC_MNM_NA": "KYACD", "EQP_CGP_CD": "HTCTX", "EQP_MDL_YR_DT": 2018, "EQP_MNU_ABR_NA": "FRGHT", "Engine": "CUMMINS WESTPORT 12G", "EQP_CSF_TYP_CD": "TR"},
    {"EQP_NR": "000004", "MTN_FAC_MNM_NA": "KYACD", "EQP_CGP_CD": "HTCTX", "EQP_MDL_YR_DT": 2017, "EQP_MNU_ABR_NA": "INTL", "Engine": "CUMMINS ISX 400", "EQP_CSF_TYP_CD": "TR"},
    {"EQP_NR": "000005", "MTN_FAC_MNM_NA": "KYACD", "EQP_CGP_CD": "HTDA", "EQP_MDL_YR_DT": 2017, "EQP_MNU_ABR_NA": "KENWO", "Engine": "PACCAR MX13 EPA13", "EQP_CSF_TYP_CD": "TR"},
    {"EQP_NR": "000006", "MTN_FAC_MNM_NA": "KYGRA", "EQP_CGP_CD": "AVAN", "EQP_MDL_YR_DT": 2019, "EQP_MNU_ABR_NA": "GMC", "Engine": "FORD 4.9L", "EQP_CSF_TYP_CD": "GS"},
    {"EQP_NR": "000007", "MTN_FAC_MNM_NA": "KYGRA", "EQP_CGP_CD": "APTK", "EQP_MDL_YR_DT": 2020, "EQP_MNU_ABR_NA": "CHEV", "Engine": "GMC 4.3L", "EQP_CSF_TYP_CD": "GS"},
    {"EQP_NR": "000008", "MTN_FAC_MNM_NA": "KYGRA", "EQP_CGP_CD": "AVAN", "EQP_MDL_YR_DT": 2022, "EQP_MNU_ABR_NA": "CHEV", "Engine": "GM 6.0L", "EQP_CSF_TYP_CD": "GS"},
    {"EQP_NR": "000009", "MTN_FAC_MNM_NA": "KYGRA", "EQP_CGP_CD": "AVAN", "EQP_MDL_YR_DT": 2013, "EQP_MNU_ABR_NA": "CHEV", "Engine": "FORD 5.4 LITER V8", "EQP_CSF_TYP_CD": "GS"},
    {"EQP_NR": "000010", "MTN_FAC_MNM_NA": "KYGRA", "EQP_CGP_CD": "APK22", "EQP_MDL_YR_DT": 2014, "EQP_MNU_ABR_NA": "CHEV", "Engine": "GM 6.0L", "EQP_CSF_TYP_CD": "GS"},
    {"EQP_NR": "000011", "MTN_FAC_MNM_NA": "NJPAR", "EQP_CGP_CD": "P100D", "EQP_MDL_YR_DT": 2007, "EQP_MNU_ABR_NA": "MOLSN", "Engine": "MBENZ 904", "EQP_CSF_TYP_CD": "PC"},
    {"EQP_NR": "000012", "MTN_FAC_MNM_NA": "NJPAR", "EQP_CGP_CD": "P100", "EQP_MDL_YR_DT": 2012, "EQP_MNU_ABR_NA": "MOLSN", "Engine": "GM 6.0L", "EQP_CSF_TYP_CD": "PC"},
    {"EQP_NR": "000013", "MTN_FAC_MNM_NA": "NJPAR", "EQP_CGP_CD": "P50", "EQP_MDL_YR_DT": 2009, "EQP_MNU_ABR_NA": "MOLSN", "Engine": "GM LR4 V8", "EQP_CSF_TYP_CD": "PC"},
    {"EQP_NR": "000014", "MTN_FAC_MNM_NA": "NJPAR", "EQP_CGP_CD": "P70", "EQP_MDL_YR_DT": 2011, "EQP_MNU_ABR_NA": "UTIL", "Engine": "GM 6.0L WRKHS", "EQP_CSF_TYP_CD": "PC"},
    {"EQP_NR": "000015", "MTN_FAC_MNM_NA": "NJPAR", "EQP_CGP_CD": "P80", "EQP_MDL_YR_DT": 2014, "EQP_MNU_ABR_NA": "MOLSN", "Engine": "GM 6.0L", "EQP_CSF_TYP_CD": "PC"}
]

def search_equipment(equipment_number):
    for equipment in equipment_list:
        if equipment["EQP_NR"] == equipment_number:
            return equipment
    return None

# Example case where equipment number 000007 is checked if it's part of inventory
equipment_number = "000007"                                 
result = search_equipment(equipment_number)

if result:
    print("EQUIPMENT FOUND")
    print("Equipment Number:", result["EQP_NR"])
    print("Maintenance Facility Name:", result["MTN_FAC_MNM_NA"])
    print("Equipment Type:", result["EQP_CGP_CD"])
    print("Model Year:", result["EQP_MDL_YR_DT"])
    print("Manufacturer:", result["EQP_MNU_ABR_NA"])
    print("Engine:", result["Engine"])
    print("Equipment Category:", result["EQP_CSF_TYP_CD"])
else:
    print("EQUIPMENT NOT FOUND")
