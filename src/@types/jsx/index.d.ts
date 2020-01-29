interface IFallbackImage extends React.SVGProps<SVGImageElement> {
  readonly src: string;
}

declare namespace JSX {
  interface IntrinsicElements {
    image: IFallbackImage;
  }
}
