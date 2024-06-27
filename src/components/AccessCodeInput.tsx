import { StyleSheet, TextInput, View } from "react-native";

type AccessCodeInputProps = {
  accessCode: string;
  handleAccessCodeChange: (code: string) => void;
};

export default function AccessCodeInput({
  accessCode,
  handleAccessCodeChange,
}: AccessCodeInputProps) {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        value={accessCode}
        onChangeText={handleAccessCodeChange}
        placeholder='Your Access Code'
        placeholderTextColor={"rgba(255, 255, 255, 0.5)"}
        style={styles.input}
        keyboardType='number-pad'
        maxLength={14}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    alignItems: "center",
    marginBottom: 30,
  },

  input: {
    width: 170,
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    paddingBottom: 5,
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
  },
});
