
interface SignatureDetails {
  name: string;
  jobTitle: string;
  company: string;
  email: string;
  phone?: string;
  website?: string;
  layout: string;
  headshot_url?: string;
  buttons?: Array<{
    id: string;
    text: string;
    type: string;
    connect_with: string;
    icon?: any;
    color?: string;
    fontStyle?: string;
  }>;
  [key: string]: any;
}

interface Signature {
  _id: string;
  SignatureName: string;
  templateInfo: { TemplatesName: string };
  createdAt: string;
  usageCount: number;
  details?: SignatureDetails;
}





export const generateSignatureHtml = (signature: Signature): string => {
  const details = signature.details;
  if (!details) return '';



  const background = details.background?.background_value || '#ffffff';
 

  let html = '';
  html += `<div cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; border-collapse: collapse; width: 100%; max-width: 650px; background: ${background}; padding: 1px; border-radius: 8px;">`;
  html += details.html

  html  = `
  <table width="100%" cellpadding="0" cellspacing="0"
  style="font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;; background-color: #f0f0f0; padding: 20px; ">
  <tr>
    <td align="center">
    
     ${html}
    
      </table>
    </td>
  </tr>

</table>
`
  html += '</div>';
  return html;
};






export const filterSignatures = (signatures: Signature[], searchQuery: string): Signature[] => {
  if (!searchQuery) return signatures;

  const lowerCaseQuery = searchQuery.toLowerCase();
  return signatures.filter(signature =>
    signature.SignatureName.toLowerCase().includes(lowerCaseQuery) ||
    signature?.templateInfo?.TemplatesName.toLowerCase().includes(lowerCaseQuery)
  );
};
export const generateStandaloneSignatureHtml = (signature: Signature): string => {
  const signatureHtml = generateSignatureHtml(signature);
  return signatureHtml;
};
