export type JSONEmojiFormat = {
  name: "emoji";
};

const emojiRegex =
  /^(\p{Extended_Pictographic}|\p{Emoji_Modifier}|\p{Emoji_Modifier_Base}|\p{Emoji_Component})*$/u;

export function inferEmoji(value: string): JSONEmojiFormat | undefined {
  if (emojiRegex.test(value)) {
    return {
      name: "emoji",
    };
  }

  return undefined;
}
