import { useState } from "react";
import { signUp, confirmSignUp } from "aws-amplify/auth";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Alert, Card, Typography, Space } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

function SignUp() {
  const [form] = Form.useForm();
  const [step, setStep] = useState("signup");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.reject("Password is required");
    }
    if (value.length < 8) {
      return Promise.reject("Password must be at least 8 characters long");
    }
    if (!/[A-Z]/.test(value)) {
      return Promise.reject(
        "Password must contain at least one uppercase letter"
      );
    }
    if (!/[0-9]/.test(value)) {
      return Promise.reject("Password must contain at least one number");
    }
    return Promise.resolve();
  };

  const handleSignUp = async (values) => {
    setLoading(true);
    setError("");
    try {
      await signUp({
        username: values.email,
        password: values.password,
        options: {
          userAttributes: {
            email: values.email,
            name: values.username,
          },
        },
      });
      setEmail(values.email);
      setStep("confirm");
    } catch (error) {
      setError(error.message || "An error occurred during sign up");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (values) => {
    setLoading(true);
    setError("");
    try {
      await confirmSignUp({ username: email, confirmationCode: values.code});
      navigate("/signin");
    } catch (error) {
      setError(error.message || "An error occurred during verification");
    } finally {
      setLoading(false);
    }
  };

  const passwordRequirements = (
    <Space direction="vertical" size="small">
      <Text type="secondary">Password must contain:</Text>
      <Text type="secondary">• At least 8 characters</Text>
      <Text type="secondary">• One uppercase letter</Text>
      <Text type="secondary">• One number</Text>
    </Space>
  );

  const signUpForm = (
    <Form
      form={form}
      onFinish={handleSignUp}
      layout="vertical"
      requiredMark={false}
    >
      <Form.Item
        name="username"
        rules={[
          { required: true, message: "Please input your name!" },
          { min: 3, message: "name must be at least 3 characters long" },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Name" size="large" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder="Email address"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ validator: validatePassword }]}
        tooltip={passwordRequirements}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Password"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("The passwords do not match!");
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Confirm password"
          size="large"
        />
      </Form.Item>

      <Form.Item>
        <Button
          className="bg-green-700 hover:bg-green-600 text-white"
          htmlType="submit"
          loading={loading}
          block
          size="large"
        >
          Sign up
        </Button>
      </Form.Item>
    </Form>
  );

  const confirmationForm = (
    <Form onFinish={handleConfirm} layout="vertical" requiredMark={false}>
      <Form.Item
        name="code"
        rules={[
          { required: true, message: "Please input verification code!" },
          { len: 6, message: "Verification code must be 6 digits!" },
        ]}
      >
        <Input
          prefix={<SafetyCertificateOutlined />}
          placeholder="Verification Code"
          size="large"
          maxLength={6}
        />
      </Form.Item>

      <Form.Item>
        <Button
          className="bg-green-700 hover:bg-green-600 text-white"
          htmlType="submit"
          loading={loading}
          block
          size="large"
        >
          Verify Account
        </Button>
      </Form.Item>

      <Text type="secondary" className="block text-center">
        Please check your email for the verification code
      </Text>
    </Form>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <Title level={2} className="text-center mb-8">
          {step === "signup" ? "Create your account" : "Verify your account"}
        </Title>

        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            className="mb-6"
            closable
            onClose={() => setError("")}
          />
        )}

        {step === "signup" ? signUpForm : confirmationForm}

        <div className="text-center mt-4">
          <Link to="/signin" className="text-green-700 hover:text-green-600">
            Already have an account? Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default SignUp;
