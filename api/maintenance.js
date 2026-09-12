export default function handler(req, res) {
  res.status(200).json({
    maintenance: process.env.MAINTENANCE_MODE === "true"
  });
}