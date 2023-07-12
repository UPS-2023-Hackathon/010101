import argparse

def main():
    parser = argparse.ArgumentParser()
    # Define the script command arguments   
    parser.add_argument(
        '--to', 
        type= str, 
        required=True
    )
    parser.add_argument(
        '--subject',
        type= str,
        required=True
    )
    parser.add_argument(
        '--attachment',
        type= str,
        required=True
    )
    args = vars(parser.parse_args()) 
    print("hello world")


if __name__ == "__main__":
    main()