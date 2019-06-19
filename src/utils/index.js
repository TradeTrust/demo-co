export const ping = (url, callback) => {
  if (!this.inUse) {
    this.inUse = true;
    this.callback = callback;
    this.url = url;

    this.img = new Image();

    this.img.onload = () => callback(true, null);
    this.img.onerror = () => callback(null, true);

    this.start = new Date().getTime();
    this.img.src = url;
  }
};
