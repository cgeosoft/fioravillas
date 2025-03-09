#!/bin/bash

# Usage: ./resize.sh <input_dir> <output_dir> <width_in_pixels>

if [ "$#" -ne 3 ]; then
  echo "Usage: $0 <input_dir> <output_dir> <width_in_pixels>"
  exit 1
fi

INPUT_DIR="$1"
OUTPUT_DIR="$2"
WIDTH="$3"

mkdir -p "$OUTPUT_DIR"

for file in "$INPUT_DIR"/*.jpg; do
  [ -e "$file" ] || continue
  filename=$(basename "$file")
  convert "$file" -resize "${WIDTH}x" "$OUTPUT_DIR/$filename"
done
