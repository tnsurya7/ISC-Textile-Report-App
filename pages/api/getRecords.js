import { supabaseAdmin } from '../../utils/supabase';
import { toCamelCaseArray } from '../../utils/dbMapper';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('records')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    return res.status(200).json({ success: true, records: toCamelCaseArray(data) });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
