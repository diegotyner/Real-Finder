#!/bin/bash
# Lowercase all file extensions recursively

find . -type f | while read -r file; do
	dir=$(dirname "$file")
	base=$(basename "$file")
	name="${base%.*}"
	ext="${base##*.}"

	# Skip files with no extension
	[[ "$name" == "$ext" ]] && continue

	lower_ext=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
	if [[ "$ext" != "$lower_ext" ]]; then
		mv -v "$file" "$dir/${name}.${lower_ext}"
	fi
done
