import json
import csv

# package-lock.json のパス
package_lock_file = 'C:/Development/ionic/ionic_sample2/package-lock.json'

# 出力する CSV ファイルのパス
output_csv = 'C:/Development/ionic/ionic_sample2/tgz_download_links.csv'

# CSVファイルのヘッダ
csv_header = ['Package Name', 'Version', 'Download URL']

# package-lock.json を解析して必要な情報を取得
def extract_package_info(package_lock_file):
    with open(package_lock_file, 'r', encoding='utf-8') as file:
        # JSON の読み込み
        data = json.load(file)

        package_data = []
        
        # packages セクションから必要な情報を取得
        for package_path, package_info in data.get('packages', {}).items():
            # パッケージ名は `node_modules/<package_name>` の形式
            if package_path.startswith('node_modules/'):
                package_name = package_path.split('/')[1]
                version = package_info.get('version')
                resolved_url = package_info.get('resolved')
                
                if resolved_url:
                    package_data.append([package_name, version, resolved_url])
        
        return package_data

# CSV に書き込む
def save_to_csv(package_data, output_csv):
    with open(output_csv, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(csv_header)  # ヘッダを出力
        writer.writerows(package_data)  # パッケージ情報を出力

    print(f"Download links have been saved to {output_csv}.")

# 実行
package_data = extract_package_info(package_lock_file)
save_to_csv(package_data, output_csv)
