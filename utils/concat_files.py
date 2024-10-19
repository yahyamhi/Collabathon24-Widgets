import os


def get_base_directory():
    """Get the base directory, one level above the current file's directory."""
    current_file_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.dirname(current_file_dir)


def get_copy_directory(base_copy_dir):
    """Prompt the user to append a path to the base directory or use the base directory."""
    append_path = input(
        f"The base directory is '{base_copy_dir}'. Do you want to append a path? (Leave empty if not): ").strip()

    if append_path:
        copy_dir = os.path.join(base_copy_dir, append_path)
    else:
        copy_dir = base_copy_dir

    # Check if the copy_dir exists
    if not os.path.exists(copy_dir):
        print(f"The directory {copy_dir} does not exist.")
        exit()

    return copy_dir


def get_files_from_directory(copy_dir):
    """Recursively collect all file paths from the specified directory, excluding certain files and directories."""
    excluded_files = {'.gitignore', 'README.md', 'package.json', 'package-lock.json'}
    excluded_dirs = {'.idea', 'node_modules', '.git', 'public'}

    files_to_process = []
    for root, dirs, files in os.walk(copy_dir):
        # Exclude specified directories
        dirs[:] = [d for d in dirs if d not in excluded_dirs]

        for file_name in files:
            # Exclude specified files
            if file_name not in excluded_files:
                files_to_process.append(os.path.join(root, file_name))

    return files_to_process


def get_files_from_list():
    """Prompt the user to input a comma-separated list of files and check their existence."""
    file_paths = input("Enter the file paths (comma separated): ").strip()
    files_to_process = [file.strip() for file in file_paths.split(',')]

    # Check if the provided files exist
    for file_path in files_to_process:
        if not os.path.exists(file_path):
            print(f"File does not exist: {file_path}")
            exit()

    return files_to_process


def write_files_to_output(files_to_process, output_file, current_script):
    """Write the contents of the files to the output file, excluding the output file and script."""
    with open(output_file, 'w') as outfile:
        for file_path in files_to_process:
            # Skip the output file and the current script file
            if file_path == output_file or file_path == current_script:
                continue

            try:
                # Write the file name before the content
                outfile.write(f"File: {file_path}\n")
                # Open and read the content of each file
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as infile:
                    outfile.write(infile.read())
                    outfile.write('\n' + '-' * 50 + '\n')  # Separate files with a line
            except Exception as e:
                # If any error occurs (like permission issues), write an error message
                outfile.write(f"Could not read file: {file_path}. Error: {e}\n")
                outfile.write('-' * 50 + '\n')


def main():
    """Main function to drive the script."""
    base_copy_dir = get_base_directory()

    # Ask the user if they want to process a directory or provide specific files
    option = input("Do you want to process a directory (1) or provide a list of files (2)? Enter 1 or 2: ").strip()

    if option == '1':
        # Get the directory to process
        copy_dir = get_copy_directory(base_copy_dir)
        files_to_process = get_files_from_directory(copy_dir)

    elif option == '2':
        # Get the list of specific files to process
        files_to_process = get_files_from_list()

    else:
        print("Invalid option. Please enter 1 or 2.")
        exit()

    # Get the current script file path
    current_script = os.path.abspath(__file__)

    # Define the output file path inside the current script's directory
    output_file = os.path.join(os.path.dirname(current_script), 'output.txt')

    # Write the files' contents to the output file
    write_files_to_output(files_to_process, output_file, current_script)

    print(f"Contents have been written to {output_file}, excluding {output_file} and {current_script}.")


# Run the main function
if __name__ == "__main__":
    main()
