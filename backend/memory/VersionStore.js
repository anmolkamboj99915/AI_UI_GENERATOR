let versions = [];

export function saveVersion(entry) {
  versions.push({
    ...entry,
    timestamp: Date.now(),
  });
}

export function getVersions() {
  return versions;
}

export function getVersion(index) {
  return versions[index];
}
