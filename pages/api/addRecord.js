import { supabaseAdmin } from '../../utils/supabase';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const {
      date,
      partyDc,
      paddingDc,
      partyName,
      fabricQuality,
      partyMtr,
      paddingMtr,
      shortOrExcess,
      printMtr,
      outwardMtr,
      balance
    } = req.body;

    const { data, error } = await supabaseAdmin
      .from('records')
      .insert([
        {
          date: date || '',
          party_dc: partyDc || '',
          padding_dc: paddingDc || '',
          party_name: partyName || '',
          fabric_quality: fabricQuality || '',
          party_mtr: partyMtr || '',
          padding_mtr: paddingMtr || '',
          short_or_excess: shortOrExcess || '',
          print_mtr: printMtr || '',
          outward_mtr: outwardMtr || '',
          balance: balance || ''
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
