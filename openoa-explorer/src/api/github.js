import axios from 'axios';

const OWNER = 'NandanBM13';
const REPO = 'OpenOAproject1';

export const fetchFolderContents = async (path) => {
  const res = await axios.get(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`
  );
  return res.data;
};

export const fetchFileContent = async (url) => {
  const res = await axios.get(url);
  return res.data;
};
