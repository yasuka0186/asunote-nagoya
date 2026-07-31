const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+\-()（）\s]+$/;

export const validateForm = (values) => {
  const errors = {};

  if (values.company.length > 100) errors.company = "会社名は100文字以内で入力してください。";
  if (!values.name.trim()) errors.name = "氏名を入力してください。";
  else if (values.name.length > 50) errors.name = "氏名は50文字以内で入力してください。";

  if (!values.email.trim()) errors.email = "メールアドレスを入力してください。";
  else if (values.email.length > 254) errors.email = "メールアドレスは254文字以内で入力してください。";
  else if (!emailPattern.test(values.email)) errors.email = "メールアドレスを正しい形式で入力してください。";

  if (values.phone.length > 20) errors.phone = "電話番号は20文字以内で入力してください。";
  else if (values.phone && !phonePattern.test(values.phone)) errors.phone = "電話番号は数字、ハイフン、括弧などで入力してください。";

  if (!values.service) errors.service = "相談したいサービスを選択してください。";
  if (!values.message.trim()) errors.message = "相談内容を入力してください。";
  else if (values.message.length > 2000) errors.message = "相談内容は2,000文字以内で入力してください。";
  if (!values.consent) errors.consent = "個人情報の取り扱いへの同意が必要です。";

  return errors;
};
