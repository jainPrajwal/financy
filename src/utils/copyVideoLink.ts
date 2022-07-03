export const copyVideoLink = async ({
  text,

}: {
  text: string;
  
}) => {
  if (!navigator.clipboard) {
    // Clipboard API not available
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error("Failed to copy!", err);
  }
};
