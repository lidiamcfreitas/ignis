#!/usr/bin/env python3
import sys
import subprocess
from pathlib import Path
from typing import List

def find_model_modules(models_dir: Path) -> List[str]:
    """Find all Python modules in the models directory and return their fully qualified module names."""
    module_names = []
    
    for py_file in models_dir.glob("*.py"):
        # Skip __init__.py and files starting with underscore
        if py_file.name.startswith("_"):
            continue
            
        # Convert file path to module name (e.g., user.py -> app.models.user)
        module_name = f"app.models.{py_file.stem}"
        module_names.append(module_name)
        print(f"Found module: {module_name}")
        
    return module_names

def run_command_for_module(module: str, output_folder_path: Path) -> None:
    """Generate TypeScript definitions using pydantic2ts for one module."""
    output_file = output_folder_path / (module.replace("app.models.", "") + ".ts")
    # Construct the command
    cmd = ["pydantic2ts"]
    cmd.extend(["--module", module])
    cmd.extend(["--output", output_file])

    # Run pydantic2ts
    print(f"running {cmd}")
    try:
        subprocess.run(cmd, check=True)
        print(f"Successfully generated TypeScript definitions at {output_file}")
    except subprocess.CalledProcessError as e:
        print(f"Error running pydantic2ts: {e}")
        sys.exit(1)

def generate_typescript_definitions(module_names: List[str], output_folder_path: Path) -> None:
    """Generate TypeScript definitions using pydantic2ts."""
    for module in module_names:
        run_command_for_module(module, output_folder_path)

def main():
    # Get absolute paths
    current_dir = Path.cwd()
    if 'backend' not in str(current_dir):
        current_dir = current_dir / "backend"
        
    models_dir = current_dir / "app" / "models"
    output_path = current_dir.parent / "frontend" / "src" / "models"
    
    # Ensure the models directory exists
    if not models_dir.exists():
        print(f"Error: {models_dir} directory not found")
        sys.exit(1)
        
    # Create the output directory if it doesn't exist
    output_path.mkdir(parents=True, exist_ok=True)
    
    # Find all model modules
    module_names = find_model_modules(models_dir)
    
    if not module_names:
        print("No Python modules found in the models directory")
        sys.exit(1)
        
    # Generate TypeScript definitions
    generate_typescript_definitions(module_names, output_path)

if __name__ == "__main__":
    main()
