#!/bin/bash

echo "🔄 Rebranding PrairieLearn to LoboLearn (display text only)..."

# Only modify these file types to keep it safe
FILES=$(grep -ril 'PrairieLearn' apps/prairielearn/src | grep -E '\.html\.ts$|\.ts$|\.js$')

for file in $FILES; do
    echo "🔧 Editing: $file"
    # Replace "PrairieLearn" with "LoboLearn" (preserving casing)
    sed -i \
        -e 's/>PrairieLearn</>LoboLearn</g' \
        -e 's/"PrairieLearn"/"LoboLearn"/g' \
        -e "s/'PrairieLearn'/'LoboLearn'/g" \
        -e 's/PrairieLearn Homepage/LoboLearn Homepage/g' \
        -e 's/PrairieLearn Workspace/LoboLearn Workspace/g' \
        -e 's/PrairieLearn documentation/LoboLearn documentation/g' \
        -e 's/PrairieLearn/LoboLearn/g' \
        "$file"
done

echo "✅ Rebranding complete!"
