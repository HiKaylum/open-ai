import clsx from 'clsx';
import Image from 'next/image'

import styles from './ConvoBox.module.scss';

export default function ConvoBox(props) {
  const {
    conversation,
    ...componentProps
  } = props;

  const reverseConversation = [...conversation].reverse();

  return (
    <ul className={styles.convoBox} {...componentProps}>
      { reverseConversation.map((convo, idx) => {
        const convoBoxItemClasses = clsx(styles.convoBoxItem, { [styles.user]: convo.isUser });
        return (
          <li className={convoBoxItemClasses} key={idx}>
            <p>
              <Image src={convo.picture} width={32} height={32} alt={convo.name} />
              { convo.name }
            </p>
            <p>{ convo.text }</p>
          </li>
        )
      }) }
    </ul>
  );
}
