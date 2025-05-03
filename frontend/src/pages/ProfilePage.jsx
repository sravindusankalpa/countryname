import { useEffect, useState } from "react";
import axios from "axios";
import { Input, Button, message, Spin, Form } from "antd";

export default function Profile() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      form.setFieldsValue(response.data); // auto fill form
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch user");
      console.error(error);
    }
  };

  const handleUpdate = async (values) => {
    try {
      setUpdating(true);
      await axios.put("http://localhost:5000/api/users", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Profile updated successfully");
    } catch (error) {
      message.error("Update failed");
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-28 px-6 py-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {loading ? (
        <Spin />
      ) : (
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input type="email" />
          </Form.Item>

          <Form.Item label="Current Password" name="currentPassword">
            <Input.Password />
          </Form.Item>

          <Form.Item label="New Password" name="newPassword">
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={updating}>
            Update Profile
          </Button>
        </Form>
      )}
    </div>
  );
}