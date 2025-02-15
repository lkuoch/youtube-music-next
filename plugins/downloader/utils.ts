import { app, BrowserWindow } from 'electron';
import is from 'electron-is';

export const getFolder = (customFolder: string) => customFolder || app.getPath('downloads');
export const defaultMenuDownloadLabel = 'Download playlist';

export const sendFeedback = (win: BrowserWindow, message?: unknown) => {
  win.webContents.send('downloader-feedback', message);
};

export const cropMaxWidth = (image: Electron.NativeImage) => {
  const imageSize = image.getSize();
  // Standart youtube artwork width with margins from both sides is 280 + 720 + 280
  if (imageSize.width === 1280 && imageSize.height === 720) {
    return image.crop({
      x: 280,
      y: 0,
      width: 720,
      height: 720,
    });
  }

  return image;
};

// Presets for FFmpeg
export const presets = {
  'None (defaults to mp3)': undefined,
  'opus': {
    extension: 'opus',
    ffmpegArgs: ['-acodec', 'libopus'],
  },
};

export const setBadge = (n: number) => {
  if (is.linux() || is.macOS()) {
    app.setBadgeCount(n);
  }
};
