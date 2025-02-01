import { spawn } from 'child_process';
import os from 'os';
import { LoggerUtils } from './library/Utilities/LoggerUtils';

const isMac = os.platform() === 'darwin';
const args: string[] = isMac ? [] : ['--legacy-watch'];

const nodemonProcess = spawn('nodemon', args, {
  stdio: 'inherit',
  shell: true
});

nodemonProcess.on('error', (error) => {
  LoggerUtils.error(`Error: ${error.message}`);
});

nodemonProcess.on('close', (code) => {
  LoggerUtils.info(`nodemon process exited with code ${code}`);
});
