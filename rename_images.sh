#!/bin/zsh
# Script pour renommer tous les fichiers images du dossier media/ sans espaces ni caractères spéciaux
cd "$(dirname "$0")/media"

for f in *; do
  # Ignore si ce n'est pas un fichier image
  [[ ! -f "$f" ]] && continue
  # Nouveau nom : minuscules, espaces -> tirets, caractères spéciaux supprimés
  new=$(echo "$f" | tr '[:upper:]' '[:lower:]' | sed -E 's/[ _]+/-/g; s/[^a-z0-9.-]//g')
  if [[ "$f" != "$new" ]]; then
    mv "$f" "$new"
    echo "$f -> $new"
  fi
done
cd ..
