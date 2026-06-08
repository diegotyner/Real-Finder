# Usage: Place this script in the directory containing your PDF folders, then run it.
#        Before running, update the SAFETY_CHECK variable below to the name of the
#        directory you intend to run this in. This prevents accidental renaming in the wrong directory.
#
# SAFETY_CHECK="your-target-directory-name-here"
SAFETY_CHECK=""

if [[ -z "$SAFETY_CHECK" || "$(basename "$PWD")" != "$SAFETY_CHECK" ]]; then
	echo "Error: Set SAFETY_CHECK to the target directory name before running."
	exit 1
fi

find . -type f | while read -r file; do
	dir=$(dirname "$file")
	base=$(basename "$file")
	name="${base%.*}"
	ext="${base##*.}"
	[[ "$name" == "$ext" ]] && continue
	upper_name=$(echo "$name" | tr '[:lower:]' '[:upper:]')
	lower_ext=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
	new_name="${upper_name}.${lower_ext}"
	if [[ "$base" != "$new_name" ]]; then
		mv -v "$file" "$dir/$new_name"
	fi
done
