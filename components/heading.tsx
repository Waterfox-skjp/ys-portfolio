type Props = {
  en: string;
  ja: string;
  addClass: string;
};

function textAry( text : string ) {
  return text.split('');
}

export default function Heading( { en, ja, addClass } : Props ) {
  const enAry = textAry(en)
  const jaAry = textAry(ja)
  return (
    <div className={'c-heading' + addClass}>
      <h2 className="c-heading__en js-fadeinup-text">
        {enAry.map((char, index) => (
          <span key={index}>
            {char}
          </span>
        ))}
      </h2>
      <div className="c-heading__ja js-fadeinup-text">
        {jaAry.map((char, index) => (
          <span key={index}>
            {char}
          </span>
        ))}
      </div>
    </div>
  )
}
