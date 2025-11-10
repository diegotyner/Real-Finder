#!/bin/bash
# Capitalize all file names recursively from current directory

find . -depth -type f | while read -r file; do
	dir=$(dirname "$file")
	base=$(basename "$file")
	upper=$(echo "$base" | tr '[:lower:]' '[:upper:]')
	if [[ "$base" != "$upper" ]]; then
		mv -v "$file" "$dir/$upper"
	fi
done
