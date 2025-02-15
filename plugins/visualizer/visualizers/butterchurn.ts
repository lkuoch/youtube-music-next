import Butterchurn from 'butterchurn';
import ButterchurnPresets from 'butterchurn-presets';

import { Visualizer } from './visualizer';

import { ConfigType } from '../../../config/dynamic';

const presets = ButterchurnPresets.getPresets();

class ButterchurnVisualizer extends Visualizer<Butterchurn> {
  name = 'butterchurn';

  visualizer: ReturnType<typeof Butterchurn.createVisualizer>;
  private readonly renderingFrequencyInMs: number;

  constructor(
    audioContext: AudioContext,
    audioSource: MediaElementAudioSourceNode,
    visualizerContainer: HTMLElement,
    canvas: HTMLCanvasElement,
    audioNode: GainNode,
    stream: MediaStream,
    options: ConfigType<'visualizer'>,
  ) {
    super(
      audioContext,
      audioSource,
      visualizerContainer,
      canvas,
      audioNode,
      stream,
      options,
    );

    this.visualizer = Butterchurn.createVisualizer(
      audioContext,
      canvas,
      {
        width: canvas.width,
        height: canvas.height,
      }
    );

    const preset = presets[options.butterchurn.preset];
    this.visualizer.loadPreset(preset, options.butterchurn.blendTimeInSeconds);

    this.visualizer.connectAudio(audioNode);

    this.renderingFrequencyInMs = options.butterchurn.renderingFrequencyInMs;
  }

  resize(width: number, height: number) {
    this.visualizer.setRendererSize(width, height);
  }

  render() {
    const renderVisualizer = () => {
      requestAnimationFrame(renderVisualizer);
      this.visualizer.render();
    };
    setTimeout(renderVisualizer, this.renderingFrequencyInMs);
  }
}

export default ButterchurnVisualizer;
